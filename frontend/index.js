import { backend } from 'declarations/backend';

document.getElementById('addTaxPayerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const tid = document.getElementById('tid').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;

  await backend.addTaxPayer(tid, firstName, lastName, address);
  alert('TaxPayer added successfully');
  document.getElementById('addTaxPayerForm').reset();
  loadAllTaxPayers();
});

document.getElementById('searchTaxPayerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTid = document.getElementById('searchTid').value;
  const result = await backend.searchTaxPayer(searchTid);
  const searchResult = document.getElementById('searchResult');
  
  if (result.length > 0) {
    const taxPayer = result[0];
    searchResult.innerHTML = `
      <h3>Search Result:</h3>
      <p>TID: ${taxPayer.tid}</p>
      <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
      <p>Address: ${taxPayer.address}</p>
    `;
  } else {
    searchResult.innerHTML = '<p>No TaxPayer found with the given TID.</p>';
  }
});

async function loadAllTaxPayers() {
  const taxPayers = await backend.getAllTaxPayers();
  const taxPayerList = document.getElementById('taxPayerList');
  taxPayerList.innerHTML = '';

  taxPayers.forEach(taxPayer => {
    const taxPayerDiv = document.createElement('div');
    taxPayerDiv.innerHTML = `
      <h3>${taxPayer.firstName} ${taxPayer.lastName}</h3>
      <p>TID: ${taxPayer.tid}</p>
      <p>Address: ${taxPayer.address}</p>
    `;
    taxPayerList.appendChild(taxPayerDiv);
  });
}

loadAllTaxPayers();
