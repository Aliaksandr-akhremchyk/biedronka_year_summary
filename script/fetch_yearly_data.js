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