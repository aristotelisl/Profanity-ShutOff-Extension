let badWebsitesSet = new Set();

async function fetchBadWebsites() {
  try {
    console.log('Fetching bad websites list...');
    const response = await fetch(chrome.runtime.getURL('bad_websites_list.txt'));
    const text = await response.text();
    const websites = text.split('\n').map(website => website.trim().toLowerCase()).filter(Boolean);
    badWebsitesSet = new Set(websites);
    updateBlockingRules();
  } catch (error) {
    console.error('Failed to fetch bad websites list:', error);
  }
}

function logCurrentDynamicRules() {
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    console.log('Current dynamic rules:', rules);
  });
}

function updateBlockingRules() {
  console.log('Updating blocking rules...');
  const rules = Array.from(badWebsitesSet).map((website, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
    condition: {
      urlFilter: `*://www.${website}/*`,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
    }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: badWebsitesSet.size }, (_, index) => index + 1),
    addRules: rules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error updating dynamic rules:', chrome.runtime.lastError);
    } else {
      console.log('Blocking rules updated successfully');
      logCurrentDynamicRules();  // Log the current rules after update
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  fetchBadWebsites();
});

chrome.runtime.onStartup.addListener(() => {
  fetchBadWebsites();
});
