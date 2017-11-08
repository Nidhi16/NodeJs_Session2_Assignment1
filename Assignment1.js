
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
    this.getCount = function() {
        return Object.keys(this.dict).length;
    };
}

var leftObj = new DataStore();
var rightObj = new DataStore();

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

function populateLeftList(result) {
    // var result = leftObj.getItems();
    // console.log(result);
    var leftPanelSelect = document.getElementById('ava_employee');
    leftPanelSelect.innerText = "";
    result.forEach(function(dict){
        var option = document.createElement('option');
        option.value = dict.id;
        option.text = dict.val;
        // console.log(option.value);
        // console.log(option.text);
        leftPanelSelect.appendChild(option);
    });
}

function populateRightList(result) {
    // var result = rightObj.getItems();

    var rightPanelSelect = document.getElementById('selec_employee');
    rightPanelSelect.innerText = "";
    result.forEach(function(dict){
        var option = document.createElement('option');
        option.value = dict.id;
        option.text = dict.val;
        // console.log(option.value);
        // console.log(option.text);
        rightPanelSelect.appendChild(option);
    });
}

var available_employee_count = document.getElementById('available_employee_count');
var selected_employee_count = document.getElementById('selected_employee_count');

available_employee_count.innerText = leftObj.getCount();
selected_employee_count.innerText = rightObj.getCount();

// Search
var firstSearchBox = document.getElementById('first');
var secondSearchBox = document.getElementById('second');

var fillterLeftList = function() {
    var queryTerm = firstSearchBox.value;
    var results = leftObj.search(queryTerm);
    populateLeftList(results);
};
firstSearchBox.addEventListener('input', fillterLeftList);

var filterRightList = function() {
    var queryTerm = secondSearchBox.value;
    var results = rightObj.search(queryTerm);
    populateRightList(results);
};
secondSearchBox.addEventListener('input', filterRightList);

var single_right_btn = document.getElementById('single_right_btn');
var multiple_right_btn = document.getElementById('multiple_right_btn');
var single_left_btn = document.getElementById('single_left_btn');
var multiple_left_btn = document.getElementById('multiple_left_btn');

single_right_btn.addEventListener('click', function(){
    var item_id = parseInt(document.getElementById('ava_employee').value);
    // debugger;
    var item_text = leftObj.getItem(item_id)();
    console.log(item_id);
    // console.log(item_text);
    rightObj.setItem(item_id, item_text);
    leftObj.removeItem(item_id);
    fillterLeftList();
    filterRightList();
    available_employee_count.innerText = leftObj.getCount();
    selected_employee_count.innerText = rightObj.getCount();    
});

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

single_left_btn.addEventListener('click', function(){
    var item_id = parseInt(document.getElementById('selec_employee').value);
    // debugger;
    var item_text = rightObj.getItem(item_id)();
    console.log(item_id);
    // console.log(item_text);
    leftObj.setItem(item_id, item_text);
    rightObj.removeItem(item_id);
    fillterLeftList();
    filterRightList();
    available_employee_count.innerText = leftObj.getCount();
    selected_employee_count.innerText = rightObj.getCount(); 
});

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


// populateLeftList();
fillterLeftList();
filterRightList();