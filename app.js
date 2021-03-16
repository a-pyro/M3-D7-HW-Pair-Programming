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
<div class="col-2 mb-2">
            <div class="card h-100 ">
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
                  class="btn btn-primary btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExampleAddress${id}"
                  aria-expanded="false"
                  aria-controls="collapseExampleAddress${id}"
                >
                  Address Details
                </button>
                <button
                  class="btn btn-secondary btn-block"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExampleCompany${id}"
                  aria-expanded="false"
                  aria-controls="collapseExampleCompany${id}"
                >
                  Company Details
                </button>
                <div class="collapse" id="collapseExampleAddress${id}">
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
                <div class="collapse" id="collapseExampleCompany${id}">
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
let users = [];
const getUsers = async (endpoint) => {
  try {
    const respone = await fetch(endpoint);
    const data = await respone.json();
    console.log(data);
    users = [...data];
    renderUsers(users);
  } catch (error) {
    console.log(error);
  }
};

const searchUser = (e) => {
  e.preventDefault();
  const option = document.querySelector('.custom-select');
  const optionValue = option.value;
  // console.log(optionValue)
  const search = document.querySelector('#searchbox').value.toLowerCase();
  console.log(search);
  console.log(optionValue);
  const userNames = users.filter((user) =>
    user[optionValue].toLowerCase().includes(search.toLowerCase())
  );

  console.log(userNames);
  renderUsers(userNames);
};
const form = document.querySelector('.form-inline');
form.addEventListener('submit', searchUser);

console.log(form);

window.onload = getUsers(userersEndpoint);

const onlyNames = (listOfUsers) => listOfUsers.filter((user) => user.name);
const stringify = (listOfUsers) =>
  listOfUsers.map((user) => JSON.stringify(user.address));
