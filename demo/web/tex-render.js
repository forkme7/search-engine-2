function tex_render(scope_select) {
	tex_tag_open  = '<span class="imath-to-render">';
	tex_tag_close = '</span>';

	replace_regex = /\[imath\]([\s\S]+?)\[\/imath\]/g;
	render_select = "span.imath-to-render";
	remove_class = "imath-to-render";
	replace_class = "imath-rendered";

	err_tag_open_0  = '<span class="imath-err" title="';
	err_tag_open_1  = '">';
	err_tag_close = '</span>';

	$(scope_select).each(function() {
		repl = $(this).html().replace(
			replace_regex,
			function (a, b) {
				return tex_tag_open + b + tex_tag_close;
			});
		$(this).html(repl);
	});

	$(render_select).each(function() {
		var tex = $(this).text();
		ele = $(this).get(0);
		try {
			katex.render(tex, ele);
		} catch(err) {
			$(this).html(
				err_tag_open_0 + err + err_tag_open_1 +
				tex + err_tag_close
			);
		}

		/* prevent from being rendered again */
		$(this).removeClass(remove_class).addClass(replace_class);
	});
}