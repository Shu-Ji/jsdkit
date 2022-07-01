let _id = new Date().getTime();

/**
 * 产生一个自增 id，能用用户作为唯一 id
 */
export function uuid() {
    const r = parseInt(Math.random().toString().slice(2)).toString(36);
    return `u_${(++_id).toString(36)}_${r}`;
}
