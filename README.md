# Script Usage Instructions

## Important Warning
The developer assumes no responsibility for the functionality of the script or its consequences. Use it at your own risk.

## Steps to Use

1. Log in to the website [https://moja.biedronka.pl/oauth/login](https://moja.biedronka.pl/oauth/login).
2. Open the developer tools (DevTools) in your browser (usually by pressing `F12` or `Ctrl+Shift+I` / `Cmd+Option+I` on Mac).
3. Go to the "Console" tab in DevTools.
4. Copy and paste the following script into the console and press `Enter`:
<details>
  <summary>Kod skryptu do skopiowania</summary>

```javascript
const year = "2025";

// Function to get the last day of a month
function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Function to fetch data for a specific month
function fetchDataForMonth(year, month) {
    const beginDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-${getLastDayOfMonth(year, month - 1)}`;

    return fetch("https://moja.biedronka.pl/panel/ajax/paragons", {
        method: "POST",
        credentials: "include",
        body: new URLSearchParams({
            page: 0,
            begin_data: beginDate,
            end_data: endDate,
            order: "desc",
            short: 0,
        }),
    })
        .then(response => response.json())
        .then(data => data.Receipts || [])
        .catch(error => {
            console.error(`Error fetching data for ${beginDate} to ${endDate}:`, error);
            return [];
        });
}

// Function to calculate yearly totals
async function calculateYearlyTotals(year) {
    const results = [];
    let totalValue = 0;
    let totalDiscount = 0;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
    const lastMonth = (parseInt(year) === currentYear) ? currentMonth : 12;

    for (let month = 1; month <= lastMonth; month++) {
        const receipts = await fetchDataForMonth(year, month);
        const monthTotalValue = receipts.reduce((sum, receipt) => sum + (receipt.TotalValue || 0), 0);
        const monthTotalDiscount = receipts.reduce((sum, receipt) => sum + (receipt.Discount || 0), 0);

        totalValue += monthTotalValue;
        totalDiscount += monthTotalDiscount;

        results.push({
            Month: `${year}-${String(month).padStart(2, '0')}`,
            TotalValue: monthTotalValue,
            Discount: monthTotalDiscount,
            DiscountPercentage: monthTotalValue ? ((monthTotalDiscount / (monthTotalValue + monthTotalDiscount)) * 100).toFixed(2) + '%' : '0%',
        });
    }

    // Add yearly totals to the results
    results.push({
        Month: "Total for Year",
        TotalValue: totalValue,
        Discount: totalDiscount,
        DiscountPercentage: totalValue ? ((totalDiscount / (totalValue + totalDiscount)) * 100).toFixed(2) + '%' : '0%',
    });

    // Log results in a table format without index column
    console.table(results, ["Month", "TotalValue", "Discount", "DiscountPercentage"]);
}

// Call the function with the specified year
calculateYearlyTotals(year);
```
</details>

5. Wait for the script to execute and display the results in the console.

## How to Request Data for Another Year
To request data for another year, call the function with the desired year. For example, for the year 2026:

1. Copy and paste the following code into the console and press `Enter`:

```javascript
calculateYearlyTotals("2026");
```

---

# Instrukcja użytkowania skryptu

## Ważne ostrzeżenie
Twórca nie ponosi żadnej odpowiedzialności za działanie skryptu i jego konsekwencje. Używasz go na własne ryzyko.

## Kroki użycia

1. Zaloguj się na stronie [https://moja.biedronka.pl/oauth/login](https://moja.biedronka.pl/oauth/login).
2. Otwórz narzędzia deweloperskie (DevTools) w swojej przeglądarce (zwykle można to zrobić, naciskając `F12` lub `Ctrl+Shift+I` / `Cmd+Option+I` na Macu).
3. Przejdź do zakładki "Console" w DevTools.
4. Skopiuj i wklej poniższy skrypt do konsoli i naciśnij `Enter`:

<details>
  <summary>Kod skryptu do skopiowania</summary>

```javascript
const year = "2025";

// Function to get the last day of a month
function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Function to fetch data for a specific month
function fetchDataForMonth(year, month) {
    const beginDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-${getLastDayOfMonth(year, month - 1)}`;

    return fetch("https://moja.biedronka.pl/panel/ajax/paragons", {
        method: "POST",
        credentials: "include",
        body: new URLSearchParams({
            page: 0,
            begin_data: beginDate,
            end_data: endDate,
            order: "desc",
            short: 0,
        }),
    })
        .then(response => response.json())
        .then(data => data.Receipts || [])
        .catch(error => {
            console.error(`Error fetching data for ${beginDate} to ${endDate}:`, error);
            return [];
        });
}

// Function to calculate yearly totals
async function calculateYearlyTotals(year) {
    const results = [];
    let totalValue = 0;
    let totalDiscount = 0;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
    const lastMonth = (parseInt(year) === currentYear) ? currentMonth : 12;

    for (let month = 1; month <= lastMonth; month++) {
        const receipts = await fetchDataForMonth(year, month);
        const monthTotalValue = receipts.reduce((sum, receipt) => sum + (receipt.TotalValue || 0), 0);
        const monthTotalDiscount = receipts.reduce((sum, receipt) => sum + (receipt.Discount || 0), 0);

        totalValue += monthTotalValue;
        totalDiscount += monthTotalDiscount;

        results.push({
            Month: `${year}-${String(month).padStart(2, '0')}`,
            TotalValue: monthTotalValue,
            Discount: monthTotalDiscount,
            DiscountPercentage: monthTotalValue ? ((monthTotalDiscount / (monthTotalValue + monthTotalDiscount)) * 100).toFixed(2) + '%' : '0%',
        });
    }

    // Add yearly totals to the results
    results.push({
        Month: "Total for Year",
        TotalValue: totalValue,
        Discount: totalDiscount,
        DiscountPercentage: totalValue ? ((totalDiscount / (totalValue + totalDiscount)) * 100).toFixed(2) + '%' : '0%',
    });

    // Log results in a table format without index column
    console.table(results, ["Month", "TotalValue", "Discount", "DiscountPercentage"]);
}

// Call the function with the specified year
calculateYearlyTotals(year);
```
</details>

5. Poczekaj, aż skrypt się wykona i wyświetli wyniki w konsoli.

## Jak zażądać dane za inny rok
Aby zażądać dane za inny rok, wywołaj funkcję z żądanym rokiem. Na przykład, dla roku 2026:

1. Skopiuj i wklej poniższy kod do konsoli i naciśnij `Enter`:

```javascript
calculateYearlyTotals("2026");
```
