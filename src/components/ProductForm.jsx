import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { CATEGORIES } from "../data/initialProducts";
import { PlusCircle, RotateCcw, AlertCircle, Sparkles } from "lucide-react";

export function ProductForm({ onAddProduct, existingCodes }) {
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const generateNextCode = () => {
    let nextNum = existingCodes.length + 1;
    let newCode = `PROD-${String(nextNum).padStart(3, "0")}`;
    while (existingCodes.includes(newCode)) {
      nextNum++;
      newCode = `PROD-${String(nextNum).padStart(3, "0")}`;
    }
    return newCode;
  };

  const validate = () => {
    const newErrors = {};

    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    } else if (descripcion.trim().length < 3) {
      newErrors.descripcion = "Debe tener al menos 3 caracteres.";
    }

    if (!precio || precio === "") {
      newErrors.precio = "El precio es obligatorio.";
    } else {
      const numPrecio = parseFloat(precio);
      if (isNaN(numPrecio) || numPrecio <= 0) {
        newErrors.precio = "El precio debe ser un número mayor que 0.";
      }
    }

    if (!categoria || categoria === "") {
      newErrors.categoria = "Debes seleccionar una categoría.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const newProduct = {
      codigo: generateNextCode(),
      descripcion: descripcion.trim(),
      precio: parseFloat(parseFloat(precio).toFixed(2)),
      categoria,
    };

    onAddProduct(newProduct);
    handleReset();
  };

  const handleReset = () => {
    setDescripcion("");
    setPrecio("");
    setCategoria("");
    setErrors({});
  };

  return (
    <motion.div
      animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-slate-300/80 shadow-md shadow-slate-400/20 bg-white overflow-hidden">
        <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Registrar nuevo producto
              </CardTitle>
              <CardDescription>
                Ingresa los datos solicitados. El código se asigna automáticamente.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Campo: Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion" required>
                Descripción del producto
              </Label>
              <Input
                id="descripcion"
                placeholder="Ej: Galletas Chocochips 150g"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                  if (errors.descripcion) setErrors({ ...errors, descripcion: null });
                }}
                error={!!errors.descripcion}
              />
              <AnimatePresence>
                {errors.descripcion && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="flex items-center gap-1.5 text-xs text-red-600 font-semibold pt-0.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    {errors.descripcion}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Fila: Precio y Categoría */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Campo: Precio */}
              <div className="space-y-2">
                <Label htmlFor="precio" required>
                  Precio de venta (S/.)
                </Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500 font-bold text-sm">
                    S/.
                  </span>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="pl-10 font-medium"
                    value={precio}
                    onChange={(e) => {
                      setPrecio(e.target.value);
                      if (errors.precio) setErrors({ ...errors, precio: null });
                    }}
                    error={!!errors.precio}
                  />
                </div>
                <AnimatePresence>
                  {errors.precio && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="flex items-center gap-1.5 text-xs text-red-600 font-semibold pt-0.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      {errors.precio}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Campo: Categoría */}
              <div className="space-y-2">
                <Label htmlFor="categoria" required>
                  Categoría
                </Label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => {
                    setCategoria(e.target.value);
                    if (errors.categoria) setErrors({ ...errors, categoria: null });
                  }}
                  className={`flex h-11 w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:border-indigo-600 shadow-xs cursor-pointer ${
                    errors.categoria
                      ? "border-red-400 bg-red-50/30 focus-visible:ring-red-400/25 focus-visible:border-red-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <option value="">Selecciona categoría...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.categoria && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="flex items-center gap-1.5 text-xs text-red-600 font-semibold pt-0.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      {errors.categoria}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <Button
                type="submit"
                className="w-full sm:flex-1 gap-2 shadow-indigo-500/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Registrar producto
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto gap-2 group"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4 text-slate-400 group-hover:-rotate-90 transition-transform duration-300" />
                Limpiar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
