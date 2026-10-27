import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { initialProducts } from "./data/initialProducts";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import {
  Boxes,
  CheckCircle2,
  X,
  TrendingUp,
  Layers,
  Store,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [productos, setProductos] = useState(initialProducts);
  const [notification, setNotification] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProductos((prev) => [newProduct, ...prev]);

    setNotification({
      id: Date.now(),
      type: "success",
      title: "¡Producto registrado con éxito!",
      message: `Se añadió "${newProduct.descripcion}" (${newProduct.codigo}) al catálogo.`,
    });

    setTimeout(() => {
      setNotification((curr) => (curr?.id ? null : curr));
    }, 4500);
  };

  const totalProductos = productos.length;
  const totalCategorias = new Set(productos.map((p) => p.categoria)).size;
  const precioPromedio =
    totalProductos > 0
      ? (productos.reduce((acc, p) => acc + Number(p.precio), 0) / totalProductos).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-screen bg-[#cad6e2] text-slate-900 flex flex-col relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Luces sutiles de fondo para dar profundidad al gris azulado claro */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-300/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-48 right-1/4 w-[450px] h-[450px] bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[500px] bg-slate-300/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Barra superior / Navbar */}
      <header className="border-b border-slate-300/80 bg-white/95 sticky top-0 z-30 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
                Gestión de productos
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Catálogo Comercial • Prototipo React + Hooks + shadcn/ui
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-7">
        {/* Banner de confirmación */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="rounded-xl border border-emerald-300 bg-emerald-50/95 text-emerald-950 shadow-md shadow-emerald-500/10 p-4.5 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-lg bg-emerald-600 text-white mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">{notification.title}</h4>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    {notification.message}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-emerald-700 hover:text-emerald-950 p-1.5 rounded-lg transition-colors cursor-pointer"
                aria-label="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tarjetas de Métricas Rápidas (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Total Productos */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-slate-300/80 bg-white p-5 shadow-md shadow-slate-400/20 hover:shadow-lg transition-all relative overflow-hidden group border-l-4 border-l-blue-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Total Productos
                </p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  {totalProductos}
                </p>
                <span className="text-[11px] font-medium text-slate-500 mt-1 inline-block">
                  Registros en catálogo
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25">
                <Boxes className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Categorías Únicas */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-slate-300/80 bg-white p-5 shadow-md shadow-slate-400/20 hover:shadow-lg transition-all relative overflow-hidden group border-l-4 border-l-purple-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Categorías Únicas
                </p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  {totalCategorias}
                </p>
                <span className="text-[11px] font-medium text-slate-500 mt-1 inline-block">
                  Familias de producto
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/25">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Precio Promedio */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-slate-300/80 bg-white p-5 shadow-md shadow-slate-400/20 hover:shadow-lg transition-all relative overflow-hidden group border-l-4 border-l-emerald-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Precio Promedio
                </p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  S/. {precioPromedio}
                </p>
                <span className="text-[11px] font-medium text-slate-500 mt-1 inline-block">
                  Media del catálogo
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Grid: Formulario (Izq) y Catálogo (Der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Sección de Registro */}
          <div className="lg:col-span-5">
            <ProductForm
              onAddProduct={handleAddProduct}
              existingCodes={productos.map((p) => p.codigo)}
            />
          </div>

          {/* Sección de Listado */}
          <div className="lg:col-span-7">
            <ProductList productos={productos} />
          </div>
        </div>
      </main>
    </div>
  );
}
