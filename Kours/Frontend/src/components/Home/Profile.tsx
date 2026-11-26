import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteMyProfile,
  fetchMyProfile,
  updateMyProfile,
} from '../../services/profileApi';
import type { UpdateProfilePayload } from '../Types';

const INITIAL_FORM: UpdateProfilePayload = {
  firstName: '',
  lastName: '',
  email: '',
  fieldOfStudy: '',
  academicLevel: '',
  institution: '',
};

export default function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UpdateProfilePayload>(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchMyProfile()
      .then((profile) => {
        if (!active) return;
        setForm({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          fieldOfStudy: profile.fieldOfStudy || '',
          academicLevel: profile.academicLevel || '',
          institution: profile.institution || '',
        });
        setError(null);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await updateMyProfile(form);
      setForm({
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        fieldOfStudy: updated.fieldOfStudy,
        academicLevel: updated.academicLevel,
        institution: updated.institution,
      });
      setSuccess('Profil enregistré avec succès.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de mise à jour');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      'Voulez-vous vraiment supprimer définitivement votre compte ?'
    );
    if (!confirmed) return;

    setDeleting(true);
    setError(null);

    try {
      await deleteMyProfile();
      localStorage.removeItem('token');
      navigate('/register');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de suppression');
      setDeleting(false);
    }
  }

  if (loading) {
    return <div className="p-6 text-slate-600">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-[#0B1440] mb-6">Mon profil</h1>

      {error && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200"
        >
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Adresse e-mail
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Domaine
            </label>
            <input
              type="text"
              placeholder="Ex. Informatique"
              value={form.fieldOfStudy}
              onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Niveau
            </label>
            <input
              type="text"
              placeholder="Ex. Licence 3"
              value={form.academicLevel}
              onChange={(e) => setForm({ ...form, academicLevel: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Établissement
            </label>
            <input
              type="text"
              placeholder="Ex. Université..."
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || saving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? 'Suppression...' : 'Supprimer mon compte'}
          </button>

          <button
            type="submit"
            disabled={saving || deleting}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
}