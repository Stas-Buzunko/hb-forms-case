var Handlebars = require('handlebars');
module.exports = Handlebars;

Handlebars.registerHelper('control-text', function (){
    let args = Array.prototype.slice.call(arguments)
        , options = args.pop() // Handlebar options, always last
        , attribute = args.shift()
        , conf = args.shift(); // Input configuration defined in JSON

    // Parse input conf and set defaults
    conf = (conf && JSON.parse(conf)) || {};
    conf.className || (conf.className = 'input-lg');
    conf.placeholder || (conf.placeholder = '');

    return new Handlebars.SafeString(`<input type="text" class="form-control ${conf.className}" data-attribute="${attribute}" placeholder="${conf.placeholder}">`);
});

Handlebars.registerHelper('control-select', function (){
    let args = Array.prototype.slice.call(arguments)
        , options = args.pop() // Handlebar options, always last
        , attribute = args.shift()
        , conf = args.shift(); // Input configuration defined in JSON

    // Parse input conf and set defaults
    conf = (conf && JSON.parse(conf)) || {};
    conf.className || (conf.className = 'input-lg');
    conf.placeholder || (conf.placeholder = '');

    // Parse the options for the select field which are defined like this
    // {{#control-select}}
    //  value1:string1
    //  value2:string2
    // {{/control-select}}
    let opts = (options.fn ? options.fn(this) : '').split('\n').map(line=>{
        line = line.replace(/^ *| *$/g,'');
        let arr = line.split(':');
        let value = arr.shift();
        // In case : is missing from the line, value == string
        let string = arr.join(':') || line;
        return line ? `<option value="${value}">${string}</option>` : ''
    }).join('');

    return new Handlebars.SafeString(`<select type="text" class="form-control ${conf.className}" data-attribute="${attribute}" placeholder="${conf.placeholder}">${opts}</select>`);
});


Handlebars.registerHelper('control-checkbox', function (){
    let args = Array.prototype.slice.call(arguments)
        , options = args.pop() // Handlebar options, always last
        , attribute = args.shift()
        , conf = args.shift(); // Input configuration defined in JSON

    // Parse input conf and set defaults
    conf = (conf && JSON.parse(conf)) || {};
    conf.className || (conf.className = 'input-lg');
    conf.placeholder || (conf.placeholder = '');

    // Parse the values for the checkboxes which are defined like this
    // {{#control-select}}
    //  value1:string1
    //  value2:string2
    // {{/control-select}}
    let checkboxes = (options.fn ? options.fn(this) : '').split('\n').map(line=>{
        line = line.replace(/^ *| *$/g,'');
        let arr = line.split(':');
        let value = arr.shift();
        // In case : is missing from the line, value == string
        let string = arr.join(':') || line;
        return line ? `<input type="checkbox" id="${attribute}-${value}" value="${value}" data-attribute="${attribute}">
<label for="${attribute}-${value}">${string}</label>` : '';
    }).join('');

    return new Handlebars.SafeString(`<div class="checkbox checkbox-horizontal">
${checkboxes}
</div>`);
});

Handlebars.registerHelper('time', function (){
    return new Date().toString();
});