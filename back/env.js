module.exports = {
    produccion: false,          // Establece a true para el entorno de producción
    PUERTO: 3000,               // Elige un puerto adecuado para tu aplicación
    tipoBaseDeDatos: 'postgresql',      // Ejemplo: 'mysql' o 'postgresql'
    nombreBaseDeDatos: 'agenda_wilson',  // Nombre de tu base de datos
    usuarioBaseDeDatos: 'postgres',   // Usuario de tu base de datos
    contraseñaBaseDeDatos: 'billing123*',  // Contraseña de tu base de datos
    hostBaseDeDatos: 'localhost',            // Host de tu base de datos
    puertoBaseDeDatos: 5432,                  // Puerto de tu base de datos
    testConexionBaseDeDatos: false,           // Establece a true para probar la conexión a la base de datos
    ciudadDefecto: 'popayan',              // Ciudad por defecto
    claveSecreta: 'tu_clave_secreta',         // Tu clave secreta para autenticación
    nombreSistema: 'citasmedicas',               // Nombre de tu sistema
    secretKey: 'andres'
}
