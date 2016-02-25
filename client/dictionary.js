Template.Dictionary.helpers({
    entires () {
        let uuid = '';
        if (!this.uuid) {
            uuid =  this.collection + '_' + this.field;
        } else {
            uuid = this.uuid;
        }
        return Dictionaries.find({uuid: uuid},{sort: {name: 1}});
    },
    entiresCount() {
        var uuid = '';
        if (!this.uuid) {
            uuid =  this.collection + '_' + this.field;
        } else {
            uuid = this.uuid;
        }

        return Template.Dictionary.__helpers[' entires'](uuid).count();
    },

    getValue(field) {
        if (field.split('.')[2]) {
            return this.object && this.object[field.split('.')[0]] && this.object[field.split('.')[0]][field.split('.')[1]] ? this.object[field.split('.')[0]][field.split('.')[1]][field.split('.')[2]] : ''
        }
        if (field.split('.')[1]) {
            return this.object && this.object[field.split('.')[0]] ? this.object[field.split('.')[0]][field.split('.')[1]] : ''
        }
        return this.object ? this.object[field] : '';
    }
});

Template.Dictionary.events({
    'click ul a.DictionaryItem': function(e,t) {
        e.preventDefault();
        var data = {};
        data[t.data.field] = $(e.currentTarget).text();
        window[t.data.collection].update({_id: t.data.object._id},{$set: data});
    },
    'click ul a.DictionaryItemRemove': function(e,t) {

        var uuid = '';
        if (!t.data.uuid) {
            uuid = t.data.collection + '_' + t.data.field;
        } else {
            uuid = t.data.uuid;
        }

        e.preventDefault();
        Meteor.call("DictionaryRemove", uuid, $(e.currentTarget).data('text'));

        var data = {};
        data[t.data.field] = '';
        window[t.data.collection].update({_id: t.data.object._id},{$unset: data});
    },
    'change input': function(e,t) {

        var uuid = '';
        if (!t.data.uuid) {
            uuid = t.data.collection + '_' + t.data.field;
        } else {
            uuid = t.data.uuid;
        }

        if ($(e.currentTarget).val() && !Dictionaries.findOne({uuid: uuid, name: $(e.currentTarget).val()})) {
            console.log('save',t.data);
            if (t.data.saveItems) {
                Dictionaries.insert({uuid: uuid, name: $(e.currentTarget).val()});
            }
        }
    }
});


Template.Dictionary.onCreated(function(){

    this.autorun(() => {
        let uuid = '';
        if (!this.data.uuid) {
            uuid = this.data.collection + '_' + this.data.field;
        } else {
            uuid = this.data.uuid;
        }
        this.subscribe('Dictionaries',{uuid});
    });
});

