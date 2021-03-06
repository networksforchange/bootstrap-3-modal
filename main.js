
let $soloModal = null;

Modal = {
    show: function (templateName, data, options) {

        let parentNode = document.body;

        let view = Blaze.renderWithData(Template[templateName], data, parentNode);

        let domRange = view._domrange; // TODO: Don't violate against the public API.

        let $modal = domRange.$('.modal');

        $modal.on('shown.bs.modal', function (event) {
            $modal.find('[autofocus]').focus();

            $modal.css('overflow-x', 'auto');
            Meteor.setTimeout(() => $modal.css('overflow-x', 'hidden'), 100);
        });

        $modal.on('hidden.bs.modal', function (event) {
            Blaze.remove(view);
            $soloModal = null;
        });

        $soloModal = $modal;

        $modal.modal(options ? options : {})

    },

    hide: function (/* optional */ template) {

        if (template instanceof Blaze.TemplateInstance) {

            template.$('.modal').modal('hide');

        } else if ($soloModal != null) {

            $soloModal.modal('hide');

        }

    }
};
