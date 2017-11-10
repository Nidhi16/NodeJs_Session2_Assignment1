
function DataStore() {
    var id, item;
    this.dict = {};

    // Sets the value 
    this.setItem = function (id, item){
        this.dict[id] = item;
    };
    // Getter. Returns a closure to get the value when called
    this.getItem = function(id) {
        var self = this;
        var result = function () {
            return self.dict[id];
        };
        return result;
    };
    // Removes the item
    this.removeItem = function(id) {
        delete this.dict[id];
    };
    // Get all the objects
    this.getIds = function() {
        return Object.keys(this.dict);
    };
    // Search objects through the parameter passed
    this.search = function(query) {
        var searchResults = [];
        var ids = this.getIds();
        ids.forEach(function(id) {
            var item_text = this.getItem(id)();
            if (item_text.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                searchResults.unshift({
                    'id': id,
                    'val': item_text
                });
            }
        }, this);
        return searchResults;
    };
    // Count the objects
    this.getCount = function() {
        return Object.keys(this.dict).length;
    };
}

// Fills the left list with result
function populateLeftList(result) {
    var leftPanelSelect = document.getElementById('ava_employee');
    leftPanelSelect.innerText = "";
    result.forEach(function(dict) {
        var option = document.createElement('option');
        option.value = dict.id;
        option.text = dict.val;
        leftPanelSelect.appendChild(option);
    });
}

// Fills the right list with result
function populateRightList(result) {
    var rightPanelSelect = document.getElementById('selec_employee');
    rightPanelSelect.innerText = "";
    result.forEach(function(dict) {
        var option = document.createElement('option');
        option.value = dict.id;
        option.text = dict.val;
        rightPanelSelect.appendChild(option);
    });
}

// Filter the left list with queryTerm
var fillterLeftList = function() {
    var queryTerm = firstSearchBox.value;
    var results = leftObj.search(queryTerm);
    populateLeftList(results);
};

// Filter the right list with queryTerm
var filterRightList = function() {
    var queryTerm = secondSearchBox.value;
    var results = rightObj.search(queryTerm);
    populateRightList(results);
};

// Count elements
var available_employee_count = document.getElementById('available_employee_count');
var selected_employee_count = document.getElementById('selected_employee_count');

// Search boxes
var firstSearchBox = document.getElementById('first');
var secondSearchBox = document.getElementById('second');

// Attach event listener to the left search input box
firstSearchBox.addEventListener('input', fillterLeftList);
// Attach event listener to the right search input box
secondSearchBox.addEventListener('input', filterRightList);

var single_right_btn = document.getElementById('single_right_btn');
var multiple_right_btn = document.getElementById('multiple_right_btn');
var single_left_btn = document.getElementById('single_left_btn');
var multiple_left_btn = document.getElementById('multiple_left_btn');

// Add event listener to the single right button
single_right_btn.addEventListener('click', function(){
    var item_id = parseInt(document.getElementById('ava_employee').value);
    var item_text = leftObj.getItem(item_id)();
    rightObj.setItem(item_id, item_text);
    leftObj.removeItem(item_id);
    fillterLeftList();
    filterRightList();
    available_employee_count.innerText = leftObj.getCount();
    selected_employee_count.innerText = rightObj.getCount();    
});

// Add event listener to the multiple right button
multiple_right_btn.addEventListener('click', function(){
    var elem = document.getElementById('ava_employee');
    for (var i = 0; i < elem.options.length; i++) {
        if(elem.options[i].selected == true){
             var item_id = parseInt(elem.options[i].value);
             var item_text = leftObj.getItem(item_id)();
             rightObj.setItem(item_id, item_text);
             leftObj.removeItem(item_id);
        }
    }
    fillterLeftList();
    filterRightList();
    available_employee_count.innerText = leftObj.getCount();
    selected_employee_count.innerText = rightObj.getCount();   
});

// Add event listener to the single left button
single_left_btn.addEventListener('click', function(){
    var item_id = parseInt(document.getElementById('selec_employee').value);
    var item_text = rightObj.getItem(item_id)();
    leftObj.setItem(item_id, item_text);
    rightObj.removeItem(item_id);
    fillterLeftList();
    filterRightList();
    available_employee_count.innerText = leftObj.getCount();
    selected_employee_count.innerText = rightObj.getCount(); 
});

// Add event listener to the multiple left button
multiple_left_btn.addEventListener('click', function(){
    var elem = document.getElementById('selec_employee');
    for (var i = 0; i < elem.options.length; i++) {
        if(elem.options[i].selected == true){
             var item_id = parseInt(elem.options[i].value);
             var item_text = rightObj.getItem(item_id)();
             leftObj.setItem(item_id, item_text);
             rightObj.removeItem(item_id);
        }
    }
    fillterLeftList();
    filterRightList();
    available_employee_count.innerText = leftObj.getCount();
    selected_employee_count.innerText = rightObj.getCount();    
});

// Created two objects for left and right datastore
var leftObj = new DataStore();
var rightObj = new DataStore();

// Populate the left box by setting values
leftObj.setItem(100, 'Adrian Kirkiand');
leftObj.setItem(101, 'Alfreda Davenport');
leftObj.setItem(102, 'Avis Hendricks');
leftObj.setItem(103, 'Beatriz Blackburn');
leftObj.setItem(104, 'Bray Knight');
leftObj.setItem(105, 'Callie Price');
leftObj.setItem(106, 'Casandra Workman');
leftObj.setItem(107, 'John Doe');
leftObj.setItem(108, 'Jane Doe');
leftObj.setItem(109, 'Ethan Bailey');
leftObj.setItem(110, 'John Snow');

// Displaying initial count(s)
available_employee_count.innerText = leftObj.getCount();
selected_employee_count.innerText = rightObj.getCount();

// Initialises the list display
fillterLeftList();
filterRightList();