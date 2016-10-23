var m = require('mithril');
var Handlebars = require('./utils/handlebars.js');
var Model = require('lw-model');

module.exports = function(opt, app){
    return m.component(View, opt, app);
}

var View = {
    controller: function(args = {}, app) {
        this.template = m.prop(defaultTemplate);
        this.model = new Model();
        this.onkeyup = (val)=>{
            this.template(val);
        }
    }
    , view: function(ctrl, args) {
        let compiled = Handlebars.compile(ctrl.template());
        return <div class="display-flex">
            <div class="panel panel-default">
                <div class="panel-heading">Handlebars template</div>
                <div class="panel-body">
                    <textarea class="form-control" value={ctrl.template()} onkeyup={m.withAttr('value', ctrl.onkeyup)}></textarea>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Output form</div>
                <div class="panel-body">
                    {m.trust(compiled({model:ctrl.model.attributes}))}
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Output model</div>
                <div class="panel-body">
                    <pre>
                        {JSON.stringify(ctrl.model.toJSON(), null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    }
}

var defaultTemplate = `<div class="form-group">
    <label class="control-label">Hey, what's your name?</label>
    {{control-text 'name'}}
</div>
{{#if model.name}}
<div class="form-group">
    <label class="control-label">What about your favorite framework?</label>
    {{#control-select 'framework'}}
    angular:Angular
    react:React
    backbone:Backbone
    ember
    {{/control-select}}
</div>
{{/if}}
{{#if model.framework}}
<div class="form-group">
    <label class="control-label">And your favorite pets?</label>
    {{#control-checkbox 'pets'}}
    dog:Dog
    cat:Cat
    parrot:Parrot
    {{/control-checkbox}}
</div>
{{/if}}
<button class="btn btn-default">Submit</button>
`;
