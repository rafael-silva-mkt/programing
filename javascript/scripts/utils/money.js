export function formatCents(cents) {

    return `$${(Math.round(cents) / 100).toFixed(2)}`;
}
