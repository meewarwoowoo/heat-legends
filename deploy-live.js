const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: "n821645",
    // Password optional, prompted if none given
    password: "StuartMcCall04",
    host: "ftp.leohector.com",
    port: 21,
    localRoot: __dirname + "/dist/",
    remoteRoot: "/public_html/boardinthevillage.co.uk/heat.boardinthevillage.co.uk/",
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ["index.html", "assets/*", "favicon.ico", "manifest.json", "robots.txt" ],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: [
        "dist/**/*.map",
        "node_modules/**",
        "node_modules/**/.*",
        ".git/**",
    ],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
};

ftpDeploy.deploy(config).then((res) => console.log("finished:", res)).catch((err) => console.log(err));