export type Event = {
	title: string;
	start: string;
	end: string;
	category: 'Jóvenes' | 'Oración' | 'Comunidad' | 'Especial';
	mode?: 'presencial' | 'online';
	location?: string;
	description?: string;
	meeting?: { url: string; id?: string; passcode?: string };
};

export const site = {
	name: 'ICE PARQUE',
	address: 'Aristóbulo del Valle 2580, Merlo',
	links: {
		maps: 'https://maps.app.goo.gl/Rxydv964KB7TH7B16',
		instagram: 'https://www.instagram.com/iceparque',
		facebook: 'https://www.facebook.com/iceparque',
		youtube: 'https://www.youtube.com/iceparque',
		whatsapp: 'https://example.com/iceparque-whatsapp',
	},
};

const iceParqueLocation = 'ICE Parque - Aristóbulo del Valle 2580, Parque San Martín, Merlo';
const plazaFundadorLocation = 'Plaza Fundador Don Francisco De Merlo — 25 de Mayo y Av. Calle Real, Merlo, Provincia de Buenos Aires';

// Instantánea normalizada del calendario "ICE Parque - Reuniones" hasta fin de 2026.
// Consultada el 16 de agosto de 2026; se reemplazará por la API en la siguiente fase.
const sundays = ['2026-08-16', '2026-08-23', '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18', '2026-10-25', '2026-11-01', '2026-11-08', '2026-11-15', '2026-11-22', '2026-11-29', '2026-12-06', '2026-12-13', '2026-12-20', '2026-12-27'];
const thursdays = ['2026-08-20', '2026-08-27', '2026-09-03', '2026-09-10', '2026-09-17', '2026-09-24', '2026-10-01', '2026-10-08', '2026-10-15', '2026-10-22', '2026-10-29', '2026-11-05', '2026-11-12', '2026-11-19', '2026-11-26', '2026-12-03', '2026-12-10', '2026-12-17', '2026-12-24', '2026-12-31'];
const presencialPrayerDays = new Set(['2026-09-03', '2026-10-01', '2026-11-05', '2026-12-03']);
const zoomPrayerDays = new Set(['2026-08-20', '2026-09-17', '2026-10-15', '2026-11-19', '2026-12-17']);
const menPrayerZoom = {
	url: 'https://us04web.zoom.us/j/79569074544?pwd=bL7ajEOlgxr72LJc8OOJxXJlDqiEic.1',
	id: '795 6907 4544',
	passcode: '2580',
};
const prayerGoogleMeet = {
	url: 'https://meet.google.com/ctc-izeg-jyw',
};

const sundayEvents: Event[] = sundays.flatMap((day) => [
	{ title: 'Santa Cena', start: `${day}T09:00:00-03:00`, end: `${day}T10:00:00-03:00`, category: 'Comunidad', mode: 'presencial', location: iceParqueLocation },
	{ title: 'Reunión General', start: `${day}T10:15:00-03:00`, end: `${day}T11:00:00-03:00`, category: 'Comunidad', mode: 'presencial', location: iceParqueLocation },
	{ title: 'Escuelita Dominical', start: `${day}T11:15:00-03:00`, end: `${day}T12:45:00-03:00`, category: 'Comunidad', mode: 'presencial', location: iceParqueLocation },
]);

const prayerEvents: Event[] = thursdays.map((day) => {
	const presencial = presencialPrayerDays.has(day);
	const zoom = zoomPrayerDays.has(day);
	const platform = zoom ? 'Zoom' : 'Google Meet';
	return {
		title: presencial ? 'Reunión de Oración y Enseñanza — Presencial' : zoom ? 'Reunión de oración - Hombres' : 'Reunión de Oración y Enseñanza',
		start: `${day}T20:00:00-03:00`, end: `${day}T21:00:00-03:00`, category: 'Oración', mode: presencial ? 'presencial' : 'online', location: presencial ? iceParqueLocation : platform,
		description: presencial ? 'Primer jueves del mes, presencial en la iglesia.' : zoom ? 'Únase a la reunión de Zoom.' : `Reunión por ${platform}. Pedí el link en los grupos de WhatsApp de la iglesia.`,
		meeting: zoom ? menPrayerZoom : !presencial ? prayerGoogleMeet : undefined,
	};
});

const outreachEvents: Event[] = ['2026-08-21', '2026-09-04', '2026-09-18', '2026-10-02', '2026-10-16', '2026-11-06', '2026-11-20', '2026-12-04', '2026-12-18'].map((day) => ({
	title: 'Amor en Acción', start: `${day}T19:00:00-03:00`, end: `${day}T20:00:00-03:00`, category: 'Especial', mode: 'presencial', location: plazaFundadorLocation,
}));

const decoTelaHogarDays = ['2026-08-19', '2026-08-26', '2026-09-02', '2026-09-09', '2026-09-16', '2026-09-23', '2026-09-30', '2026-10-07', '2026-10-14', '2026-10-21', '2026-10-28', '2026-11-04', '2026-11-11', '2026-11-18', '2026-11-25', '2026-12-02', '2026-12-09', '2026-12-16', '2026-12-23', '2026-12-30'];
const decoTelaHogarEvents: Event[] = decoTelaHogarDays.map((day) => ({
	title: 'Taller DecoTelaHogar', start: `${day}T14:00:00-03:00`, end: `${day}T17:00:00-03:00`, category: 'Especial', mode: 'presencial', location: iceParqueLocation, description: 'Taller libre y gratuito en nuestra iglesia.',
}));
const memoriaEvents: Event[] = decoTelaHogarDays.map((day) => ({
	title: 'Taller de la Memoria', start: `${day}T15:00:00-03:00`, end: `${day}T16:00:00-03:00`, category: 'Especial', mode: 'presencial', location: iceParqueLocation, description: 'Taller libre y gratuito en nuestra iglesia.',
}));
const costuraEvents: Event[] = thursdays.map((day) => ({
	title: 'Taller de Costura, Marroquinería y Reciclado', start: `${day}T15:00:00-03:00`, end: `${day}T16:00:00-03:00`, category: 'Especial', mode: 'presencial', location: iceParqueLocation, description: 'Taller libre y gratuito en nuestra iglesia.',
}));
const activadosTejaditoEvents: Event[] = ['2026-09-05', '2026-10-03', '2026-11-07', '2026-12-05'].map((day) => ({
	title: 'Activados x Jesús', start: `${day}T15:00:00-03:00`, end: `${day}T17:00:00-03:00`, category: 'Especial', mode: 'presencial', location: 'El Tejadito — Parque Presidente Néstor Kirchner, Constitución 152, Merlo, Provincia de Buenos Aires, Argentina',
}));
const activadosIceEvents: Event[] = ['2026-09-19', '2026-10-17', '2026-11-21', '2026-12-19'].map((day) => ({
	title: 'Activados x Jesús', start: `${day}T18:00:00-03:00`, end: `${day}T20:00:00-03:00`, category: 'Especial', mode: 'presencial', location: iceParqueLocation,
}));
export const events: Event[] = [
	{ title: 'Reunión de Mujeres — Todo tiene su tiempo', start: '2026-09-12T15:30:00-03:00', end: '2026-09-12T18:00:00-03:00', category: 'Especial', mode: 'presencial', location: 'Aristóbulo del Valle 2580, Parque San Martín, Merlo, Buenos Aires', description: 'Tema: “Todo tiene su tiempo” (Eclesiastés 3) — Es tiempo de florecer. Compartiremos una merienda. Taller de manualidades con Margarita Farías.' },
	{ title: 'Activados x Jesús', start: '2026-08-15T15:00:00-03:00', end: '2026-08-15T17:00:00-03:00', category: 'Especial', mode: 'presencial', location: 'Parque Presidente Néstor Kirchner' },
	{ title: 'Jóvenes Fuera de Serie', start: '2026-08-22T18:00:00-03:00', end: '2026-08-22T21:00:00-03:00', category: 'Jóvenes', mode: 'presencial', location: iceParqueLocation, description: 'Nos visitan jóvenes de Morón, Húsares, Villa Celina y Villa Urquiza.' },
	{ title: 'Taller de Evangelismo', start: '2026-08-29T09:00:00-03:00', end: '2026-08-29T12:30:00-03:00', category: 'Especial', mode: 'presencial', location: iceParqueLocation, description: 'A cargo de Martín Rebai y hermanos. Traer mate para el break.' },
	{ title: 'Picnic Activados x Jesús', start: '2026-12-05T09:00:00-03:00', end: '2026-12-05T11:00:00-03:00', category: 'Especial', mode: 'presencial', location: 'Francisco Álvarez', description: 'Más información más adelante.' },
	...sundayEvents, ...prayerEvents, ...outreachEvents, ...decoTelaHogarEvents, ...memoriaEvents, ...costuraEvents, ...activadosTejaditoEvents, ...activadosIceEvents,
].sort((first, second) => new Date(first.start).getTime() - new Date(second.start).getTime());

// La agenda mensual prioriza actividades especiales; los horarios fijos se muestran aparte.
export const specialEvents = events.filter((event) => event.category !== 'Comunidad' && event.category !== 'Oración');

export const formatEventDate = (value: string, compact = false) => new Intl.DateTimeFormat('es-AR', {
	weekday: compact ? 'short' : 'long', day: 'numeric', month: compact ? 'short' : 'long',
	hour: '2-digit', minute: '2-digit', hour12: false,
}).format(new Date(value)).replace(',', ' ·').replace(/\.$/, '').toUpperCase() + ' HS';
