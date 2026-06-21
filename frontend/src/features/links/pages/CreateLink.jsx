import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import LinkForm from "../components/LinkForm";
import useLinks from "../hooks/useLinks";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import Loader from "../../../shared/components/Loader";

const CreateLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { linkId } = useParams();
  const { addLink, editLink, error, fetchLink, loading } = useLinks();
  const [editingLink, setEditingLink] = useState(location.state?.link || null);
  const isEditing = Boolean(linkId);
  const defaultValues = useMemo(
    () => ({
      title: editingLink?.title || "",
      url: editingLink?.url || "",
    }),
    [editingLink]
  );

  useEffect(() => {
    if (!isEditing || editingLink) {
      return;
    }

    fetchLink({ linkId })
      .then(setEditingLink)
      .catch(() => {});
  }, [editingLink, fetchLink, isEditing, linkId]);

  const handleSubmit = async (formData) => {
    if (isEditing) {
      await editLink({ linkId, ...formData });
    } else {
      await addLink(formData);
    }

    navigate("/dashboard/links");
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="display-title display-gradient text-5xl">
          {isEditing ? "Edit link" : "Add a new link"}
        </h1>
        <p className="mt-3 text-lg font-medium text-zinc-500">
          {isEditing
            ? "Update the title or destination, then save it back to your links."
            : "Keep titles short and action-oriented. The best links earn 3x more clicks."}
        </p>
      </div>
      <div className="max-w-[875px]">
        <Link
          to="/dashboard/links"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-950"
        >
          <ArrowLeft size={18} />
          Back to links
        </Link>
        {isEditing && !editingLink && loading ? (
          <Loader label="Loading link..." />
        ) : (
          <LinkForm
            defaultValues={defaultValues}
            loading={loading}
            onCancel={() => navigate("/dashboard/links")}
            onSubmit={handleSubmit}
            submitLabel={isEditing ? "Update link" : "Save link"}
          />
        )}
        {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}
      </div>
    </DashboardLayout>
  );
};

export default CreateLink;

