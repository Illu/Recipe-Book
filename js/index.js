"use strict";

var RECIPES = [{
  "name": "Pancakes",
  "ingredients": ["flour", "milk", "eggs", "sugar", "butter"]
}, {
  "name": "Pasta",
  "ingredients": ["pasta", "water"]
}];

var STORAGE_NAME = "_Illusion_recipes";

var AddButton = React.createClass({
  displayName: "AddButton",

  handleClick: function handleClick() {
    var name = document.getElementById('rName').value;
    if (name.length <= 0) name = 'Unnamed recipe';
    var ingredients = document.getElementById('rIngredients').value.split(',');
    RECIPES.push({ "name": name, "ingredients": ingredients });
    this.props.updateRecipe();
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { className: "btn btn-primary", "data-toggle": "modal", "data-target": "#addModal" },
        "Add recipe"
      ),
      React.createElement(
        "div",
        { id: "addModal", className: "modal fade", role: "dialog" },
        React.createElement(
          "div",
          { className: "modal-dialog" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal" },
                "\xD7"
              ),
              React.createElement(
                "h4",
                { className: "modal-title" },
                "Add Recipe"
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "p",
                null,
                "Choose a name for your recipe"
              ),
              React.createElement("input", {
                type: "text",
                id: "rName",
                placeholder: "Name...",
                spellcheck: "false"
              }),
              React.createElement(
                "p",
                null,
                "Enter the ingredients for your recipe, separated by a comma"
              ),
              React.createElement("input", {
                type: "text",
                id: "rIngredients",
                className: "ingredientsInput",
                placeholder: "Ingredient 1, ingredient 2, ...",
                spellcheck: "false"
              })
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                "Close"
              ),
              React.createElement(
                "button",
                { onClick: this.handleClick, type: "button", className: "btn btn-primary", "data-dismiss": "modal" },
                "Add recipe"
              )
            )
          )
        )
      )
    );
  }
});

var DeleteButton = React.createClass({
  displayName: "DeleteButton",

  handleClick: function handleClick() {
    RECIPES.splice(this.props.num - 1, 1);
    this.props.updateRecipe();
  },
  render: function render() {
    return React.createElement(
      "button",
      { onClick: this.handleClick, className: "btn btn-danger deleteButton" },
      "Delete"
    );
  }

});

var EditButton = React.createClass({
  displayName: "EditButton",


  handleClick: function handleClick() {
    var recipeId = 'rEditName' + this.props.num;
    var ingredientsId = 'rEditIngredients' + this.props.num;
    var name = document.getElementById(recipeId).value;
    if (name.length <= 0) name = 'Unnamed recipe';
    var ingredients = document.getElementById(ingredientsId).value.split(',');
    RECIPES[this.props.num - 1] = { "name": name, "ingredients": ingredients };
    this.props.updateRecipe();
  },

  render: function render() {

    var idName = 'editModal' + this.props.num;
    var idFull = '#' + idName;
    var ingredients = this.props.recipe.ingredients.join(',');
    var recipeId = 'rEditName' + this.props.num;
    var ingredientsId = 'rEditIngredients' + this.props.num;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { className: "btn btn-default", "data-toggle": "modal", "data-target": idFull },
        "Edit"
      ),
      React.createElement(
        "div",
        { id: idName, className: "modal fade", role: "dialog" },
        React.createElement(
          "div",
          { className: "modal-dialog" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal" },
                "\xD7"
              ),
              React.createElement(
                "h4",
                { className: "modal-title" },
                "Edit Recipe"
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "p",
                null,
                "Change the name of the recipe"
              ),
              React.createElement("input", {
                type: "text",
                id: recipeId,
                defaultValue: this.props.recipe.name,
                spellcheck: "false", placeholder: "Name..."
              }),
              React.createElement(
                "p",
                null,
                "Change the ingredients for your recipe"
              ),
              React.createElement("input", {
                type: "text",
                id: ingredientsId,
                className: "ingredientsInput",
                defaultValue: ingredients,
                spellcheck: "false",
                placeholder: "Ingredient 1, ingredient 2, ..."
              })
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                "Close"
              ),
              React.createElement(
                "button",
                { onClick: this.handleClick, type: "button", className: "btn btn-primary", "data-dismiss": "modal" },
                "Edit recipe"
              )
            )
          )
        )
      )
    );
  }
});

var Ingredients = React.createClass({
  displayName: "Ingredients",


  render: function render() {
    var nodes = this.props.data.map(function (ingredient) {
      return React.createElement(
        "li",
        { className: "list-group-item" },
        ingredient
      );
    });
    return React.createElement(
      "ul",
      { className: "list-group" },
      nodes
    );
  }
});

var Recipes = React.createClass({
  displayName: "Recipes",


  updateRecipe: function updateRecipe() {
    this.setState({ data: RECIPES });
  },

  getInitialState: function getInitialState() {

    if (typeof Storage !== "undefined") {
      if (JSON.parse(localStorage.getItem(STORAGE_NAME))) {
        console.log("retrieved data from memory: " + localStorage.getItem(STORAGE_NAME));
        RECIPES = JSON.parse(localStorage.getItem(STORAGE_NAME));
      }
    } else {
      console.log("Web storage isn't supported on this browser");
    }

    return { data: RECIPES };
  },

  render: function render() {

    console.log(this.state.data);
    var num = 0;
    var parent = this;
    localStorage.setItem(STORAGE_NAME, JSON.stringify(RECIPES));

    var nodes = this.state.data.map(function (recipe) {
      var collapseName = 'collapse' + num;
      num++;
      return React.createElement(
        "div",
        { className: "panel-group" },
        React.createElement(
          "div",
          { className: "panel panel-default" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
              "h4",
              { className: "panel-title" },
              React.createElement(
                "a",
                { "data-toggle": "collapse", href: '#' + collapseName },
                recipe.name
              )
            )
          ),
          React.createElement(
            "div",
            { id: collapseName, className: "panel-collapse collapse" },
            React.createElement(Ingredients, { data: recipe.ingredients }),
            React.createElement(
              "div",
              { className: "panel-footer" },
              React.createElement(DeleteButton, { num: num, updateRecipe: parent.updateRecipe }),
              React.createElement(EditButton, { num: num, recipe: recipe, updateRecipe: parent.updateRecipe })
            )
          )
        )
      );
    });

    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "col-xs-3" }),
        React.createElement(
          "div",
          { className: "col-xs-6 recipeList" },
          nodes
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "col-xs-3" }),
        React.createElement(
          "div",
          { className: "col-xs-6" },
          React.createElement(AddButton, { updateRecipe: this.updateRecipe })
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Recipes, { data: RECIPES }), document.getElementById("book"));
//# sourceMappingURL=/Users/maxime/Documents/GitHub/Recipe-Book/babel/index.js.map