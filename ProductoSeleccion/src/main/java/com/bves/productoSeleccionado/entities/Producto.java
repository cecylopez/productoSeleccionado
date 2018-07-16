package com.bves.productoSeleccionado.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
@Entity
public class Producto {
	@Id
	int codigo;
	String nombre;
	@Column(name="cantidad_existencia")
	int cantidadExistencia;
	@Column(name="precio_unitario")
	int precioUnitario;
	@Column(name="categoria_codigo")
	int categoriaCodigo;
	@Transient
	boolean guardado;
	@Transient
	boolean destacado;
	
	
	@OneToOne(mappedBy="producto", optional=true)
	ProductoGuardado productoGuardado;
	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getCantidadExistencia() {
		return cantidadExistencia;
	}
	public void setCantidadExistencia(int cantidadExistencia) {
		this.cantidadExistencia = cantidadExistencia;
	}
	public int getPrecioUnitario() {
		return precioUnitario;
	}
	public void setPrecioUnitario(int precioUnitario) {
		this.precioUnitario = precioUnitario;
	}
	public int getCategoriaCodigo() {
		return categoriaCodigo;
	}
	public void setCategoriaCodigo(int categoriaCodigo) {
		this.categoriaCodigo = categoriaCodigo;
	}
	public ProductoGuardado getProductoGuardado() {
		return productoGuardado;
	}
	public void setProductoGuardado(ProductoGuardado productoGuardado) {
		this.productoGuardado = productoGuardado;
	}
	public boolean isGuardado() {
		return guardado;
	}
	public void setGuardado(boolean guardado) {
		this.guardado = guardado;
	}
	public boolean isDestacado() {
		return destacado;
	}
	public void setDestacado(boolean destacado) {
		this.destacado = destacado;
	}
	
	
}
