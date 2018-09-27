var socket = io();

display = experiences => {
	$experiences = document.querySelector('#experiences');

	removeChildren($experiences);

	for (let prop in experiences) {
		let experience = experiences[prop];
		let $experience = document.createElement('div');

		$experience.id = experience.slug;
		// $experience.setAttribute('data-title', experience.title);
		$experience.setAttribute('data-flags', experience.flags);
		$experience.setAttribute('data-format', experience.format);

		$experience.innerHTML = `
			<video poster="${experience.cover_image}">
				<source src="${experience.cover_video}" type="video/mp4">
			</video>
			<h2>${experience.title}</h2>
			<div class="attributes">
				<a href="${experience.author_url}">
					<span>${experience.author}</span>
				</a>
			</div>
			<p>${experience.description}</p>
			<button data-action="play" data-data="${prop}">play</button>
			<button data-action="stop">stop</button>`;

		$experiences.appendChild($experience);
	}
};

play = experience => {
	for (let el of document.querySelectorAll('.selected'))
		el.classList.remove('selected');
	document.querySelector('#' + experience.slug).classList.add('selected');
};
