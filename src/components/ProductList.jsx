import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/Table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Package, Search, Tag, DollarSign, Hash, Sparkles } from "lucide-react";

export function ProductList({ productos }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = productos.filter((prod) => {
    const q = searchTerm.toLowerCase();
    return (
      prod.codigo.toLowerCase().includes(q) ||
      prod.descripcion.toLowerCase().includes(q) ||
      prod.categoria.toLowerCase().includes(q)
    );
  });

  return (
    <Card className="border-slate-300/80 shadow-md shadow-slate-400/20 bg-white overflow-hidden">
      <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                Catálogo de Productos
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/70">
                  {productos.length} {productos.length === 1 ? "registro" : "registros"}
                </span>
              </CardTitle>
              <CardDescription>
                Listado en tiempo real con datos simulados en memoria
              </CardDescription>
            </div>
          </div>

          {/* Buscador interactivo */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por código, nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-xs transition-all"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/90 border-b border-slate-200">
              <TableHead className="w-[120px] font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-indigo-500" />
                  Código
                </div>
              </TableHead>
              <TableHead className="font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-indigo-500" />
                  Descripción
                </div>
              </TableHead>
              <TableHead className="w-[140px] font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" />
                  Categoría
                </div>
              </TableHead>
              <TableHead className="w-[130px] text-right font-bold text-slate-600">
                <div className="flex items-center justify-end gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
                  Precio
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center text-slate-500">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-2 py-4"
                    >
                      <div className="p-3 rounded-full bg-slate-100 text-slate-400">
                        <Package className="w-7 h-7 stroke-[1.5]" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        No se encontraron productos
                      </p>
                      <p className="text-xs text-slate-400">
                        {searchTerm
                          ? "Prueba con otro término en el buscador"
                          : "Agrega uno desde el formulario de registro"}
                      </p>
                    </motion.div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((prod, index) => (
                  <motion.tr
                    key={prod.codigo}
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors group"
                  >
                    <TableCell className="font-mono text-xs font-bold text-slate-700">
                      <span className="bg-slate-100 group-hover:bg-indigo-100/60 group-hover:text-indigo-800 transition-colors px-2.5 py-1 rounded-md text-slate-800 border border-slate-200">
                        {prod.codigo}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900 group-hover:text-indigo-950 transition-colors">
                      {prod.descripcion}
                    </TableCell>
                    <TableCell>
                      <Badge>{prod.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center font-mono font-bold text-sm text-emerald-700 bg-emerald-50/90 border border-emerald-200/80 px-2.5 py-1 rounded-md shadow-2xs">
                        S/. {Number(prod.precio).toFixed(2)}
                      </span>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
