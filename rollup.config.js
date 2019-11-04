import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'Neutrino',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
