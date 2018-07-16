package com.bves.productoSeleccionado.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bves.productoSeleccionado.entities.ProductoGuardado;

public interface ProductoGuardadoRepository extends JpaRepository<ProductoGuardado, Integer> {
	

}
