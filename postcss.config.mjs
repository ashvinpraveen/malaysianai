// Small (svh), dynamic (dvh) and large (lvh) viewport units need Chrome 108.
// The SMART boards run Chromium 89, where `min-height: 100svh` is invalid and
// the hero collapses to nothing.
//
// A plain `vh` declaration in front is not enough. A value with var() is only
// checked once computed, so Chrome 89 keeps the later svh value, fails to
// compute it, and falls back to the initial value. Instead, rewrite each rule
// to use vh/vw and restore the original values under @supports right after it.
const newViewportUnit = /(\d)[sdl]v(h|w|min|max)\b/g;
const supportsQuery = '(height: 1svh)';

function usesNewViewportUnit(value) {
	newViewportUnit.lastIndex = 0;
	return newViewportUnit.test(value);
}

function insideAtRule(node, test) {
	for (let parent = node.parent; parent; parent = parent.parent) {
		if (parent.type === 'atrule' && test(parent)) return true;
	}
	return false;
}

const viewportUnitFallbacks = {
	postcssPlugin: 'viewport-unit-fallbacks',
	Rule(rule, { AtRule }) {
		if (insideAtRule(rule, atRule => atRule.name.endsWith('keyframes'))) return;
		if (insideAtRule(rule, atRule => atRule.name === 'supports' && atRule.params === supportsQuery)) return;
		const declarations = rule.nodes.filter(node => node.type === 'decl' && usesNewViewportUnit(node.value));
		if (declarations.length === 0) return;

		const supports = new AtRule({ name: 'supports', params: supportsQuery });
		supports.append(rule.clone({ nodes: declarations.map(decl => decl.clone()) }));
		rule.after(supports);
		for (const decl of declarations) decl.value = decl.value.replace(newViewportUnit, '$1v$2');
	},
};

export default {
	plugins: [viewportUnitFallbacks],
};
