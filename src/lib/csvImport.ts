import { MenuItem } from "./menuItems";

export interface CSVRow {
  [key: string]: string;
}

export function parseCSV(csvContent: string): CSVRow[] {
  const lines = csvContent.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;

    const row: CSVRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function csvToMenuItems(csvRows: CSVRow[]): MenuItem[] {
  return csvRows.map((row) => ({
    id: row["ID"] || "",
    category: (row["Category"] || "deli") as any,
    name: row["Name"] || "",
    description: row["Description"] || undefined,
    price: parseFloat(row["Price (EGP)"] || "0") || 0,
    currency: "EGP",
    nutrition: {
      calories: row["Calories"] ? parseFloat(row["Calories"]) : undefined,
      protein: row["Protein (g)"] ? parseFloat(row["Protein (g)"]) : undefined,
      carbs: row["Carbs (g)"] ? parseFloat(row["Carbs (g)"]) : undefined,
      fat: row["Fat (g)"] ? parseFloat(row["Fat (g)"]) : undefined,
      fiber: row["Fiber (g)"] ? parseFloat(row["Fiber (g)"]) : undefined,
    },
    tags: row["Tags"]
      ? row["Tags"].split(";").map((t) => t.trim())
      : undefined,
  }));
}

export async function loadCSVFromUrl(url: string): Promise<MenuItem[]> {
  const response = await fetch(url);
  const csvContent = await response.text();
  const rows = parseCSV(csvContent);
  return csvToMenuItems(rows);
}
