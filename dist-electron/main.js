import { app as n, BrowserWindow as s, session as p, desktopCapturer as c, Menu as d } from "electron";
import { fileURLToPath as R } from "node:url";
import e from "node:path";
const _ = e.dirname(R(import.meta.url));
process.env.APP_ROOT = e.join(_, "..");
const t = process.env.VITE_DEV_SERVER_URL, E = e.join(process.env.APP_ROOT, "dist-electron"), i = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? e.join(process.env.APP_ROOT, "public") : i;
let o;
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), o = null);
});
n.on("activate", () => {
  s.getAllWindows().length === 0 && r();
});
n.whenReady().then(() => {
  r();
});
function r() {
  o = new s({
    width: 1100,
    height: 600,
    resizable: !1,
    frame: !1,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }), p.defaultSession.setDisplayMediaRequestHandler((f, l) => {
    c.getSources({ types: ["screen"] }).then((a) => {
      l({ video: a[0], audio: "loopback" });
    });
  }), d.setApplicationMenu(null), t ? o.loadURL(t) : o.loadFile(e.join(i, "index.html"));
}
export {
  E as MAIN_DIST,
  i as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};
