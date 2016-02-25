Meteor.publish('Dictionaries',function(selector,options) {
    if (this.userId) {
        return Dictionaries.find(selector || {}, options || {});
    }
});

Meteor.methods({
    DictionaryRemove: function(uuid, text) {
        if (this.userId) {
            Dictionaries.remove({uuid: uuid, name: '' + text});
        }
    }
});

Dictionaries.allow({
    insert: function(userId){
        return userId;
    },
    update: function(userId){
        return userId;
    },
    remove: function(userId){
        return userId;
    }
});
