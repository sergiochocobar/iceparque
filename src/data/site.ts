export type Event = {
	title: string;
	start: string;
	category: 'Jóvenes' | 'Oración' | 'Comunidad' | 'Especial';
	mode: 'presencial' | 'online';
	location: string;
	description?: string;
};

export const site = {
	name: 'ICE PARQUE',
	address: 'Aristóbulo del Valle 2580, Merlo',
	links: {
		maps: 'https://maps.app.goo.gl/Rxydv964KB7TH7B16',
		facebook: 'https://www.facebook.com/iceparque',
		youtube: 'https://www.youtube.com/iceparque',
		whatsapp: 'https://example.com/iceparque-whatsapp',
	},
};

// Instantánea normalizada del calendario "ICE Parque - Reuniones" hasta fin de 2026.
// Consultada el 15 de agosto de 2026; se reemplazará por la API en la siguiente fase.
const sundays = ['2026-08-16', '2026-08-23', '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18', '2026-10-25', '2026-11-01', '2026-11-08', '2026-11-15', '2026-11-22', '2026-11-29', '2026-12-06', '2026-12-13', '2026-12-20', '2026-12-27'];
const thursdays = ['2026-08-20', '2026-08-27', '2026-09-03', '2026-09-10', '2026-09-17', '2026-09-24', '2026-10-01', '2026-10-08', '2026-10-15', '2026-10-22', '2026-10-29', '2026-11-05', '2026-11-12', '2026-11-19', '2026-11-26', '2026-12-03', '2026-12-10', '2026-12-17', '2026-12-24', '2026-12-31'];
const presencialPrayerDays = new Set(['2026-09-03', '2026-10-01', '2026-11-05', '2026-12-03']);

const sundayEvents: Event[] = sundays.flatMap((day) => [
	{ title: 'Santa Cena', start: `${day}T09:00:00-03:00`, category: 'Comunidad', mode: 'presencial', location: 'ICE Parque' },
	{ title: 'Reunión General', start: `${day}T10:15:00-03:00`, category: 'Comunidad', mode: 'presencial', location: 'ICE Parque' },
	{ title: 'Escuelita Dominical', start: `${day}T11:15:00-03:00`, category: 'Comunidad', mode: 'presencial', location: 'ICE Parque' },
]);

const prayerEvents: Event[] = thursdays.map((day) => {
	const presencial = presencialPrayerDays.has(day);
	return {
		title: presencial ? 'Reunión de Oración y Enseñanza — Presencial' : 'Reunión de Oración y Enseñanza',
		start: `${day}T20:00:00-03:00`, category: 'Oración', mode: presencial ? 'presencial' : 'online', location: presencial ? 'ICE Parque' : 'Online',
		description: presencial ? 'Primer jueves del mes, presencial en la iglesia.' : 'Reunión por Zoom. Pedí el link en los grupos de WhatsApp de la iglesia.',
	};
});

const outreachEvents: Event[] = ['2026-08-21', '2026-09-04', '2026-09-18', '2026-10-02', '2026-10-16', '2026-11-06', '2026-11-20', '2026-12-04', '2026-12-18'].map((day) => ({
	title: 'Amor en Acción', start: `${day}T19:00:00-03:00`, category: 'Especial', mode: 'presencial', location: 'Plaza Founder Don Francisco De Merlo',
}));

export const events: Event[] = [
	{ title: 'Activados x Jesús', start: '2026-08-15T15:00:00-03:00', category: 'Especial', mode: 'presencial', location: 'Parque Presidente Néstor Kirchner' },
	{ title: 'Jóvenes Fuera de Serie', start: '2026-08-22T18:00:00-03:00', category: 'Jóvenes', mode: 'presencial', location: 'ICE Parque', description: 'Nos visitan jóvenes de Morón, Húsares, Villa Celina y Villa Urquiza.' },
	{ title: 'Taller de Evangelismo', start: '2026-08-29T09:00:00-03:00', category: 'Especial', mode: 'presencial', location: 'ICE Parque', description: 'Capacitación y herramientas para compartir el evangelio.' },
	...sundayEvents, ...prayerEvents, ...outreachEvents,
].sort((first, second) => new Date(first.start).getTime() - new Date(second.start).getTime());

// La agenda mensual prioriza actividades especiales; los horarios fijos se muestran aparte.
export const specialEvents = events.filter((event) => event.category !== 'Comunidad' && event.category !== 'Oración');

export const formatEventDate = (value: string, compact = false) => new Intl.DateTimeFormat('es-AR', {
	weekday: compact ? 'short' : 'long', day: 'numeric', month: compact ? 'short' : 'long',
	hour: '2-digit', minute: '2-digit', hour12: false,
}).format(new Date(value)).replace(',', ' ·').replace(/\.$/, '').toUpperCase();
