const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones,isShowAll);
    
    
}
const displayPhone  = (phones,isShowAll) => {
// console.log(phones);
const phoneContainer = document.getElementById('phone-container');

// clear container before adding new elements 
phoneContainer.textContent = '';
// display view all btn if there are more than 9 element 
const viewAllContainer = document.getElementById('viewAll-container');
if(phones.length > 9 && !isShowAll){
   viewAllContainer.classList.remove('hidden');
}
else{
    viewAllContainer.classList.add('hidden');
}
console.log('is show all', isShowAll);

// display only 9 items  if not show all
if(!isShowAll){
    phones = phones.slice(0,9);
}



phones.forEach(phone => {
    // console.log(phone);
    // create a div 
    const phoneCard = document.createElement('div');
    // add classlist to the div 
    phoneCard.classList ='card p-4 bg-gray-100 shadow-xl';
    // 3.set innerhtml
    phoneCard.innerHTML= `
    <figure class="px-10 pt-10">
              <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>There are many variations in phones</p>
              <div class="card-actions">
                <button onclick="showDetails('${phone.slug}')" class=" text-white btn btn-active btn-accent">Show Details</button>
              </div>
            </div>
    `;
    // append child
    phoneContainer.appendChild(phoneCard);


});

// hide loading spinner 
toggleLoadingSpinner(false);

}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-Field');
    const searchText = searchField.value ;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
    
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinnerLoader');
   if(isLoading){
    loadingSpinner.classList.remove('hidden');
   }
   else{
    loadingSpinner.classList.add('hidden');
   }
   
}
const handleShowAll = () => {
    handleSearch(true);
    // console.log('show all');
    
}
const showDetails = async (id) => {
    // console.log('connected');
    // console.log(id);
    // load individual phn data 
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
//    console.log(phone.data);
const phone = data.data;
   showPhoneDetails(phone);
  
}

// show phn showDetails 
const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.classList.add('text-xl');
    showDetailContainer.innerHTML=`
    <div class="bg-red-50"><img class="mx-32" src="${phone.image}" alt=""></div>
    <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
    <p><span class="font-bold">Display:</span> ${phone.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Bluetooth:</span> ${phone?.others?.Bluetooth}</p>
    <p><span class="font-bold">Release-date:</span> ${phone?.releaseDate}</p>
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    
    `
    
    show_Detail_Modal.showModal();
}


// loadPhone();
