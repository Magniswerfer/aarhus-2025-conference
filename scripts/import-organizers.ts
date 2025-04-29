import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid';

// Initialize Sanity client
const client = createClient({
  projectId: '7lk3t6n2', // Replace with your project ID
  dataset: 'production',
  token: 'sksDNg40c1JGdh57HknGmmiuysxoLz4i0eJ74SAyT1YqmBev73j7SsENNl5VhjtTLEJTNUmcW344RAtZNCgb2BjK6rimacm9td2Yb1b1oUtlvs5pKPM77xNPNV8XYBt1HDoXiqgWpWRTLNbddS6nzkAuJ1mbnSYvxpEiW5pb591SYi6xzNTm',
  apiVersion: '2023-05-03',
  useCdn: false
});

// Read and parse CSV file
const csvFilePath = path.join(__dirname, '../data/organizers.csv');
const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
const records = csv.parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true, // Allow unescaped quotes
  relax_column_count: true, // Handle varying number of columns
  trim: true // Trim whitespace from fields
});

// Group organizers by workshop
const workshops = records.reduce((acc: any, record: any) => {
  const workshopTitle = record.Workshop;
  if (!acc[workshopTitle]) {
    acc[workshopTitle] = {
      title: workshopTitle,
      organizers: []
    };
  }
  
  acc[workshopTitle].organizers.push({
    _key: uuidv4(), // Add unique key for each organizer
    name: record.Name
  });
  
  return acc;
}, {});

// Function to create or update workshop document
async function createOrUpdateWorkshop(workshop: any) {
  try {
    // First, try to find existing workshop
    const existingWorkshops = await client.fetch(
      `*[_type == "acceptedWorkshop" && title == $title][0]`,
      { title: workshop.title }
    );

    if (existingWorkshops) {
      // Update existing workshop
      await client
        .patch(existingWorkshops._id)
        .set({
          organizers: workshop.organizers
        })
        .commit();
      console.log(`Updated workshop: ${workshop.title}`);
    } else {
      // Create new workshop
      await client.create({
        _type: 'acceptedWorkshop',
        title: workshop.title,
        contactName: '', // Leave empty to be set manually
        contactEmail: '', // Leave empty to be set manually
        organizers: workshop.organizers,
        description: '', // To be added manually
        workshopDocument: '' // To be added manually
      });
      console.log(`Created new workshop: ${workshop.title}`);
    }
  } catch (error) {
    console.error(`Error processing workshop ${workshop.title}:`, error);
  }
}

// Process all workshops
async function processWorkshops() {
  for (const workshop of Object.values(workshops)) {
    await createOrUpdateWorkshop(workshop);
  }
}

// Run the import
processWorkshops()
  .then(() => console.log('Import completed'))
  .catch(error => console.error('Import failed:', error)); 