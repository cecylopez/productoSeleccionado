package com.bves.productoSeleccionado.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bves.productoSeleccionado.entities.Producto;

public interface ProductoRepository  extends JpaRepository<Producto, Integer>{

}
