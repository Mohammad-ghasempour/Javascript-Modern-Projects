//Item controller
const ItemCtrl = (() => {
  //Item constructor
  function Item(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure / state
  const data = {
    item: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookie", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  //Public methods
  return {
    getItems: () => {
      return data.item;
    },
    logData: () => {
      return data;
    },
    addItem: (name, calories) => {
      let ID;
      if (data.item.length > 0) {
        ID = data.item[data.item.length - 1].id + 1;
      } else {
        ID = 0;
      }
      calories = parseInt(calories);
      newItem = new Item(ID, name, calories);
      data.item.push(newItem);
      return newItem;
    },
    getTotalCalories: ()=>{
      let total = 0;
      data.item.forEach((item)=>{
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
    },
    getItemById: (id)=>{
      let found = null;
      data.item.forEach((item)=>{
        if (item.id === id){
          found= item
        }
      })
      return found;
    },
    setCurrentItem: (item)=>{
      data.currentItem = item
    },
    getCurrentItem: ()=>{
      return data.currentItem;
    }
  };
})();

//UI controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",

  };
  return {
    populateItemLists: (items) => {
      let html = "";
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: (item) => {
      document.querySelector(UISelectors.itemList).style.display = "block";
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: ()=>{
      document.querySelector(UISelectors.itemNameInput).value ="";
      document.querySelector(UISelectors.itemCaloriesInput).value="";
    },
    getSelectors: () => {
      return UISelectors;
    },
    showTotalCalories: (totalCalories)=>{
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    hideList: ()=>{
      document.querySelector(UISelectors.itemList).style.display= "none";
    },
    clearEditState: ()=>{
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    addItemToForm: ()=>{
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showEditState: ()=>{
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    }
  };
})();

//App controller
const App = ((ItemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
      document.querySelector(UISelectors.itemList).addEventListener("click" , itemUpdateSubmit);
  };

  const itemAddSubmit = (e) => {
    const input = UICtrl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      UICtrl.clearInput();
    }

    e.preventDefault();
  };
  const itemUpdateSubmit = (e)=>{
if (e.target.classList.contains('edit-item')){
  const listId = e.target.parentNode.parentNode.id;
  const id = parseInt(listId.slice(-1))
  const itemToEdit = ItemCtrl.getItemById(id);
  ItemCtrl.setCurrentItem(itemToEdit);
  UICtrl.addItemToForm();
}

    e.preventDefault()
  }

  //Public methods
  return {
    init: () => {
      UICtrl.clearEditState();
      //Fetch items from data structure
      const items = ItemCtrl.getItems();
      items.length===0 ? UICtrl.hideList() : UICtrl.populateItemLists(items); 

      const totalCalories = ItemCtrl.getTotalCalories()
      UICtrl.showTotalCalories(totalCalories);
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//Initial App:
App.init();
