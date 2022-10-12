function(instance, properties, context) {

    $(document).ready(_ => properties.bubble.is_visible && instance.data.run(properties));

}