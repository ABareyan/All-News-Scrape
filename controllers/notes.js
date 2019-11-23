var makeDate = require("../scripts/date");
var Notes = require("../models/Note");

module.exports = {
    get: function(data, cb) {
        Notes.find({
            _headlineId: data._id
        }, cb);
    },
    save: function(data, cb) {
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };

        Notes.create(newNote, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function(data, cb) {
        Notes.remove({
            _id: data._id
        }, cb);
    }
};