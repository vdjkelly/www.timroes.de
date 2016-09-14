import glob from 'glob';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import moment from 'moment';
import paths from '../paths';
import gutil from 'gulp-util';
import config from './config';
import * as utils from '../utils';
import Renderer from '../rendering/Renderer';

const mtimes = {};

/**
 * This function will read all posts from the markdowns in the post content folder.
 * It will read out the markdown and the front-matter header of these files.
 * It will also add some additional information that is calculated from the meta
 * data (e.g. the URL of the post).
 * It will then filter out all draft posts if we are currenlty building a production
 * build (specifying --production on command line when building).
 * It will also link post series together after it loaded all posts.
 *
 * This function does not render the posts. If you want rendered posts look at
 * the posts.js file in the same folder.
 */
export default function() {
	const posts = glob.sync(paths.content.posts).map(function(file) {

		const {meta, markdown} = utils.readFrontmatterFile(file.toString());

		if (!meta || !meta.created || !meta.title) {
			throw new Error("Required meta fields are missing.");
		}

		const mtime = moment(fs.statSync(file.toString()).mtime);
		const date = moment(meta.created);
		const id = path.basename(file, '.md');
		const url = `/${path.join(date.format("YYYY/MM/DD"), meta.slug || id)}/`;

		const md5Hash = crypto.createHash('md5').update(file.toString()).digest('hex');

		return {
			url: url,
			id: id,
			created: date,
			meta: meta,
			markdown: markdown.trim(),
			mtime: mtime,
			file: file.toString(),
			filePathHash: md5Hash
		};

	}).filter(post => {
		// Filter out draft articles if --production was specified when running gulp
		return post.meta.status !== 'draft' || gutil.env.production === undefined;
	}).filter(post => {
		// Filter out only posts from the 10kapart series
		return post.meta.series === '10kapart';
	}).sort(function(a, b) {
		return b.created - a.created;
	});

	const series = {};
	// Find series posts matching together
	posts.forEach(function(post) {
		if (post.meta.series) {
			series[post.meta.series] = series[post.meta.series] || [];
			series[post.meta.series].push(post);
			post.series = series[post.meta.series];
		}
	});

	return posts;
};
