var menu_app = new Vue({
    el: '#menu-app',
    data: {
        stand_id: null,
        stand_name: null,
        menu_data: null,

        select_items: [],
        total_charge: 0,
        delete_base64: "data:image/png;base64,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"
    },
    methods: {
        show_menu: function(stand_id){
            this.$data.stand_id = stand_id;
            menu_app.clear_item();
            menu_app.get_menu();
            document.getElementById("modal-button").click();
        },
        add_item: function (idx) {
            var food_id = this.$data.menu_data[idx].food_id
            var item_name = this.$data.menu_data[idx].food_name;
            var item_price = this.$data.menu_data[idx].food_price;
            this.$data.select_items.push({
                food_id: idx,
                food_name: item_name,
                food_price: item_price
            })
            this.update_total_charge();
        },
        delete_item: function (idx) {
            console.log(idx);
            this.$data.select_items.splice(idx, 1);
            this.update_total_charge();
        },
        clear_item: function () {
            this.$data.select_items = [];
            this.$data.total_charge = 0;
        },
        update_total_charge: function () {
            this.$data.total_charge = 0;
            for (var i = 0; i < this.$data.select_items.length; i++) {
                this.$data.total_charge += this.$data.select_items[i].food_price;
            }
        },
        get_menu: function () {
            axios({
                method: 'get',
                url: '/api/stand/' + menu_app.$data.stand_id, 'Content-Type': 'text/html'
            })
                .then(function (response) {
                    menu_app.$data.menu_data = response.data.data.menu_data;
                    menu_app.$data.stand_name = response.data.data.stand_name;
                    console.log(menu_app.$data.menu_data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        send_item: function () {
            var order = {
                stand_id: this.$data.stand_id,
                total_charge: this.$data.total_charge,
                select_items: this.$data.select_items
            };
            console.log(order);
            axios({
                method: 'post',
                url: '/api/order',
                data: order
            })
                .then(function (response) {
                    console.log(response);
                    alert("order success!!");
                    document.getElementById("modal-button").click();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})