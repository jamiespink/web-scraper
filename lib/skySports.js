const url = "https://www.skysports.com/premier-league-fixtures";

async function skySports(browser) {
  let page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  await page.goto(url);
  // const frame = page
  //   .mainFrame()
  //   .childFrames()
  //   .find((frame) => frame.url().includes("cdn.privacy-mgmt.com"));
  // await frame.click(".sp_message-accept-button");
  await page.waitFor(
    () => document.querySelectorAll(".fixres__body > *").length
  );
  const matches = await page.$$eval(".fixres__body > *", (rows) => {
    let date;
    let matchesArray = [];
    rows.forEach((row) => {
      const rowClass = row.getAttribute("class");
      if (rowClass === "fixres__header2") {
        date = row.textContent;
      } else if (rowClass === "fixres__item") {
        console.log(
          row.querySelector(".matches__participant--side1 .swap-text__target")
            .textContent
        );
        // only get matches that aren't underway or postponed
        matchesArray.push({
          date: date,
          time: row.querySelector(".matches__date").textContent.trim(),
          home: row.querySelector(
            ".matches__participant--side1 .swap-text__target"
          ).textContent,
          away: row.querySelector(
            ".matches__participant--side2 .swap-text__target"
          ).textContent,
        });
      }
    });
    return matchesArray;
  });
  await page.close();
  return matches;
}

export { skySports };
