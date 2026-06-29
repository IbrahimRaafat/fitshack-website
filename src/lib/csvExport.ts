import { MenuItem, menuItems } from "./menuItems";

export function exportMenuToCSV(): string {
  const headers = [
    "ID",
    "Category",
    "Name",
    "Description",
    "Price (EGP)",
    "Calories",
    "Protein (g)",
    "Carbs (g)",
    "Fat (g)",
    "Fiber (g)",
    "Tags",
  ];

  const rows = menuItems.map((item) => [
    item.id,
    item.category,
    item.name,
    item.description || "",
    item.price,
    item.nutrition?.calories || "",
    item.nutrition?.protein || "",
    item.nutrition?.carbs || "",
    item.nutrition?.fat || "",
    item.nutrition?.fiber || "",
    item.tags?.join("; ") || "",
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  return csvContent;
}

export function downloadMenuCSV(): void {
  const csv = exportMenuToCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `fitshack-menu-${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeCSV(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
