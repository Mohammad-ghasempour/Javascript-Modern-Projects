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
  };
})();

//UI controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
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
    hideList: ()=>{
      document.querySelector(UISelectors.itemList).style.display= "none";
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
  };

  const itemAddSubmit = (e) => {
    const input = UICtrl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //Public methods
  return {
    init: () => {
      //Fetch items from data structure
      const items = ItemCtrl.getItems();
      items.length===0 ? UICtrl.hideList() : UICtrl.populateItemLists(items); 
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//Initial App:
App.init();
