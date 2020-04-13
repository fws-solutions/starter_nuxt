export default function ({ store, redirect }) {
    if (store.$storage.getUniversal('_authToken') !== null) {
        return redirect('/')
    }
}
