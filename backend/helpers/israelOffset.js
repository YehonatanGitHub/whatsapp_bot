function getTimezoneOffset(tz) {
    const d = new Date();
    const a = d.toLocaleString("ja", { timeZone: tz }).split(/[/\s:]/);
    a[1]--;
    const t1 = Date.UTC.apply(null, a);
    const t2 = new Date(d).setMilliseconds(0);
    return (t2 - t1) / 60 / 1000;
}
var myTimezoneName = "Asia/Jerusalem";
var offset = getTimezoneOffset(myTimezoneName)
global.israelTime = () => new Date(new Date().getTime() - (offset * 60000));
// console.log(israelTime());