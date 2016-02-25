Package.describe({
    name: 'jaaaco:dictionary',
    version: '0.0.2',
    // Brief, one-line summary of the package.
    summary: 'Editable input / dropdown which optionally remembers its entires',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('blaze-html-templates', 'client');
    api.use('ecmascript');
    api.use('jaaaco:editable@0.0.5');
    api.use('wfirma:dot@0.0.2');

    api.addFiles('lib/dictionary.js');
    api.addFiles('server/dictionary.js', 'server');
    api.addFiles('client/dictionary.html', 'client');
    api.addFiles('client/dictionary.js', 'client');
});
