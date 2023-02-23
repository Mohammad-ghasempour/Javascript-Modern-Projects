//Item controller
const ItemCtrl = (() => {
  //Item constructor
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data structure / state
  const data = {
    item: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookie", calories: 400 },
      { id: 0, name: "Eggs", calories: 300 },
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
  };
})();

//UI controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
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
  };
})();

//App controller
const App = ((ItemCtrl, UICtrl) => {
  //Public methods
  return {
    init: () => {
      //Fetch items from data structure
      const items = ItemCtrl.getItems();
      UICtrl.populateItemLists(items);
    },
  };
})(ItemCtrl, UICtrl);

//Initial App:
App.init();
