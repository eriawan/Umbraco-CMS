(function () {
    "use strict";

    function UserRoleEditController($scope, $timeout, $location, usersResource) {

        var vm = this;

        vm.loading = false;
        vm.page = {};
        vm.userRole = {};

        vm.goBack = goBack;
        vm.openSectionPicker = openSectionPicker;
        vm.openContentPicker = openContentPicker;
        vm.openMediaPicker = openMediaPicker;
        vm.removeSelectedItem = removeSelectedItem;
        vm.getUserStateType = getUserStateType;

        function init() {

            vm.loading = true;

            // get user
            usersResource.getUserRole().then(function (userRole) {
                vm.userRole = userRole;
            });

            // fake loading
            $timeout(function () {
                vm.loading = false;
            }, 500);
            
        }

        function goBack() {
            $location.path("/users/users/overview").search("subview", "roles");
        }

        function openSectionPicker() {
            alert("open section picker");
        }

        function openContentPicker() {
            vm.contentPicker = {
                title: "Select content start node",
                view: "contentpicker",
                multiPicker: true,
                show: true,
                submit: function(model) {
                    if(model.selection) {
                        vm.userRole.startNodesContent = model.selection;
                    }
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                },
                close: function(oldModel) {
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                }
            };
        }

        function openMediaPicker() {
            vm.contentPicker = {
                title: "Select media start node",
                view: "treepicker",
                section: "media",
                treeAlias: "media",
                entityType: "media",
                multiPicker: true,
                show: true,
                submit: function(model) {
                    if(model.selection) {
                        vm.userRole.startNodesMedia = model.selection;
                    }
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                },
                close: function(oldModel) {
                    vm.contentPicker.show = false;
                    vm.contentPicker = null;
                }
            };
        }

        function removeSelectedItem(index, selection) {
            selection.splice(index, 1);
        }

        function getUserStateType(state) {
            switch (state) {
                case "disabled" || "umbracoDisabled":
                    return "danger";
                case "pending":
                    return "warning";
                default:
                    return "success";
            }
        }
 
        init();

    }

    angular.module("umbraco").controller("Umbraco.Editors.Users.RoleController", UserRoleEditController);

})();
