
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
    this.getItems = function() {
        // console.log(this.dict);
        // console.log(Object.keys(this.dict));
        var items = [];
        var self = this;
        Object.keys(this.dict).forEach(function(id) {
            var temp = {};
            temp['id'] = id;
            temp['val'] = self.dict[id];
            items.unshift(temp);
        });
        return items;
    };
}

var leftObj = new DataStore();
var rightObj = new DataStore();

leftObj.setItem(0, 'Adrian Kirkiand');
leftObj.setItem(1, 'Alfreda Davenport');
leftObj.setItem(2, 'Avis Hendricks');
leftObj.setItem(3, 'Beatriz Blackburn');
leftObj.setItem(4, 'Bray Knight');
leftObj.setItem(5, 'Callie Price');
leftObj.setItem(6, 'Casandra Workman');
leftObj.setItem(7, 'John Doe');
leftObj.setItem(8, 'Jane Doe');
leftObj.setItem(9, 'Ethan Bailey');
leftObj.setItem(10, 'John Snow');

function populateLeftList() {
    var result = leftObj.getItems();
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

function populateRightList() {
    var result = rightObj.getItems();

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

populateLeftList();
populateRightList();

var available_employee_count = document.getElementById('available_employee_count');
var selected_employee_count = document.getElementById('selected_employee_count');

available_employee_count.innerText = leftObj.getItems().length;
selected_employee_count.innerText = rightObj.getItems().length;

var single_right_btn = document.getElementById('single_right_btn');
var multiple_right_btn = document.getElementById('multiple_right_btn');
var single_left_btn = document.getElementById('single_left_btn');
var multiple_left_btn = document.getElementById('multiple_left_btn');

single_right_btn.addEventListener('click', function(){
    var item_id = parseInt(document.getElementById('ava_employee').value);
    // debugger;
    var item_text = leftObj.getItem(item_id);
    console.log(item_id);
    // console.log(item_text);
    rightObj.setItem(item_id, item_text());
    leftObj.removeItem(item_id);
    populateLeftList();
    populateRightList();
    available_employee_count.innerText = leftObj.getItems().length;
    selected_employee_count.innerText = rightObj.getItems().length;
    
});

multiple_right_btn.addEventListener('click', function(){
    var elem = document.getElementById('ava_employee');
    for (var i = 0; i < elem.options.length; i++) {
        if(elem.options[i].selected == true){
             var item_id = parseInt(elem.options[i].value);
             console.log(item_id);
             var item_text = leftObj.getItem(item_id);
             console.log(item_text());
             rightObj.setItem(item_id, item_text());
             console.log(rightObj.getItem(item_id)());
             leftObj.removeItem(item_id);
        }
    }
    populateLeftList();
    populateRightList();
    available_employee_count.innerText = leftObj.getItems().length;
    selected_employee_count.innerText = rightObj.getItems().length;
    
});

single_left_btn.addEventListener('click', function(){
    var item_id = parseInt(document.getElementById('selec_employee').value);
    // debugger;
    var item_text = rightObj.getItem(item_id);
    console.log(item_id);
    // console.log(item_text);
    leftObj.setItem(item_id, item_text());
    rightObj.removeItem(item_id);
    populateLeftList();
    populateRightList();
    available_employee_count.innerText = leftObj.getItems().length;
    selected_employee_count.innerText = rightObj.getItems().length;
    
});

multiple_left_btn.addEventListener('click', function(){
    var elem = document.getElementById('selec_employee');
    for (var i = 0; i < elem.options.length; i++) {
        if(elem.options[i].selected == true){
             var item_id = parseInt(elem.options[i].value);
             var item_text = rightObj.getItem(item_id);
             leftObj.setItem(item_id, item_text());
             rightObj.removeItem(item_id);
        }
    }
    populateLeftList();
    populateRightList();
    available_employee_count.innerText = leftObj.getItems().length;
    selected_employee_count.innerText = rightObj.getItems().length;
    
});
