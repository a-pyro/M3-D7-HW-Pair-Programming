'use strict';

console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

const userersEndpoint = 'https://jsonplaceholder.typicode.com/users';
const robotSrc = 'https://robohash.org/';
const CardComponent = ({
  name,
  id,
  phone,
  username,
  email,
  website,
  company: { name: companyName, catchPhrase, bs },
  address: { city, street, suite, zipcode, geo },
}) => `
<div class="col-6 mb-2">
            <div class="card">
              <img
                src="https://robohash.org/${id}"
                class="card-img-top img-id"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title name">${name}</h5>
                <ul class="list-group list-group-flush user-info">
                  <li class="list-group-item email"><a href="mailto:${email}">${email}</a></li>
                  <li class="list-group-item phone">${phone}</li>
                  <li class="list-group-item username">${username}</li>
                  <li class="list-group-item website"><a href="${website}">${website}</a></li>
                  <li class="list-group-item d-none" id=${id}></li>
                </ul>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExampleAddress"
                  aria-expanded="false"
                  aria-controls="collapseExampleAddress"
                >
                  Address Details
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExampleCompany"
                  aria-expanded="false"
                  aria-controls="collapseExampleCompany"
                >
                  Company Details
                </button>
                <div class="collapse" id="collapseExampleAddress">
                  <div class="card card-body">
                    <ul class="list-group list-group-flush user-info">
                    <li class="list-group-item">City: ${city}</li>
                    <li class="list-group-item">Street: ${street}</li>
                    <li class="list-group-item">Suite: ${suite}</li>
                    <li class="list-group-item">Zipcode: ${zipcode}</li>
                    <li class="list-group-item">Geo:${geo.lat} ${geo.lng}</li>

                   </ul>
                  </div>
                </div>
                <div class="collapse" id="collapseExampleCompany">
                  <div class="card card-body company-info">
                    <ul class="list-group list-group-flush user-info">
                    <li class="list-group-item">Name: ${companyName}</li>
                    <li class="list-group-item">Catchphrase: ${catchPhrase}</li>
                    <li class="list-group-item">BS: ${bs}</li>
                   </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;

const renderUsers = (data) => {
  const row = document.getElementById('mainRow');
  row.innerHTML = data.reduce((acc, cv) => acc + CardComponent(cv), '');
};

const getUsers = async (endpoint) => {
  try {
    const respone = await fetch(endpoint);
    const data = await respone.json();
    console.log(data);

    renderUsers(data);
  } catch (error) {
    console.log(error);
  }
};

window.onload = getUsers(userersEndpoint);
