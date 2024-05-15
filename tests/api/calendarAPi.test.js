import calendarAPi from "../../src/api/calendarAPi"

describe('Pruebas en el calendarApi', () => { 

    test('debe de tener la configuración por defecto', () => { 

        expect(calendarAPi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    });

    /* test('debe de tener el x-token en el header de todas las peticiones', async() => { 
        localStorage.setItem('token','ABC-123-XYZ');
        const res = await calendarAPi.get('/auth');
        console.log(res)
     }) */
 })