import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ExternalLink, Trash2, Vault, Lock } from "lucide-react";
import { getVault, addVaultItem, deleteVaultItem } from "@/lib/store";

const StudyVault = () => {
  const [vault, setVault] = useState(getVault());
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !link.trim()) return;
    addVaultItem(name.trim(), link.trim());
    setVault(getVault());
    setName("");
    setLink("");
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteVaultItem(id);
    setVault(getVault());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Vault className="w-6 h-6 text-primary" /> Study <span className="gradient-text">Vault</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Your private materials — only you can see these
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-gold text-sm px-4 py-2 rounded-lg flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {showForm && (
        <motion.form
          onSubmit={handleAdd}
          className="card-elevated p-4 space-y-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Material name"
            maxLength={100}
            className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Material link (URL)"
            className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={!name.trim() || !link.trim()} className="btn-gold text-sm px-4 py-2 rounded-lg disabled:opacity-50">
            Save to Vault
          </button>
        </motion.form>
      )}

      {vault.length === 0 ? (
        <div className="card-elevated p-12 text-center">
          <Vault className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Your vault is empty. Add materials to get started!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {vault.map((item, i) => (
            <motion.div
              key={item.id}
              className="card-elevated p-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate">{item.link}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive/80">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyVault;
